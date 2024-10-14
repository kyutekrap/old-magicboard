import { Button, FormHelperText, IconButton, List, ListItem, ListItemText, MenuItem, Select, Stack, TextField } from "@mui/material"
import { connect } from "react-redux"
import { useState } from "react"
import Icon from "@mdi/react"
import { mdiClose } from "@mdi/js"
import { setInterface, setSnackbar } from "@/redux/actions"
import * as tp from '@/types'
import * as mt from '@/method'
import * as md from '@/metadata'
import * as sv from '@/service'
import Reference from "@/component/fieldOnly/reference"


const Filter = ({
    page_id,
    setBackDrop,
    disableRun,
    maxLength,
    customFunction,

    commonStrings,
    errorStrings,
    customStrings,
    intrface,
    modules,
    setSnackbar,
    setInterface
}: {
    page_id: string,
    setBackDrop: any,
    disableRun?: boolean,
    maxLength?: number,
    customFunction?: Function,

    commonStrings: Record<string, string>,
    errorStrings: Record<string, string>,
    customStrings: Record<string, string>,
    intrface: tp.PageItemGet,
    modules: tp.Modules[],
    setSnackbar: Function,
    setInterface: Function
}) => {

    // Override RunConditions
    const [disabled] = useState(disableRun ?? false)

    // Set maximum length if exists
    const [ml] = useState(maxLength ?? null)

    // Payload
    const [payload, setPayload] = useState<tp.RefreshDataPost>({
        page_id: page_id,
        module_id: modules.filter(module => module.activated)[0].module_id,
        filterCol: '',
        sorting: -1,
        offset: 0,
        searchSpec: []
    })

    // Key States
    const [type, setType] = useState('')

    // Conditions
    const [cpayload, setCpayload] = useState<tp.SearchSpecification>({
        filterCol: '',
        operator: '',
        value: '' || {'_id': '', 'name': ''},
    })

    // Reference page id states
    const [referencePageId, setReferencePageId] = useState('')

    // Override input handler
    const e_inputHandler = (value: string) => {
        mt.inputFixedHandler(setCpayload, 'filterCol', value)
        if (mt.validateString(value)) {
            const key = intrface.keys[page_id].find(key => key.name === value)
            if (key) {
                setType(key.type)
                if (key.reference) setReferencePageId(key.reference?._id)
            }
        }
    }

    // Add Condition
    const addCondition = () => {
        if (ml !== null && payload.searchSpec.length === ml) {
            setSnackbar({
                "open": true,
                "message": mt.getString("maxFilters", errorStrings).replace("{0}", ml.toString())
            })
            return
        }
        if (!(
            mt.validateString(cpayload.filterCol) &&
            mt.validateString(cpayload.operator) &&
            mt.validateString(cpayload.value)
        )) return
        const newSearchSpec = payload.searchSpec.concat([cpayload])
        mt.inputFixedHandler(setPayload, 'searchSpec', newSearchSpec)
        if (customFunction) {
            customFunction(newSearchSpec)
        }
    }

    // Remove Condition
    const removeCondition = (index: number) => {
        const newSearchSpec = payload.searchSpec.filter((_condition: tp.SearchSpecification, idx: number) => idx !== index)
        mt.inputFixedHandler(setPayload, 'searchSpec', newSearchSpec)
        if (customFunction) {
            customFunction(newSearchSpec)
        }
    }

    // Run Condition
    const runConditions = () => {
        if (payload.searchSpec.length === 0) return
        const newPayload = JSON.parse(JSON.stringify(payload))
        newPayload.searchSpec = payload.searchSpec.map((condition: tp.SearchSpecification) => {
            const dtype = intrface.keys[page_id].filter(key => key.name === condition.filterCol)[0].type
            if (dtype === 'Date' || dtype === 'Date & Time') {
                return {
                    ...condition,
                    value: mt.toTimestamp(condition.value as string)
                }
            } else if (dtype === 'True/False') {
                return {
                    ...condition,
                    value: mt.bool(condition.value as string)
                }
            } else if (dtype === 'Reference') {
                return {
                    ...condition,
                    value: (condition.value as tp.ReferenceList)._id
                }
            }
            return condition
        })
        sv.RefreshDataService(newPayload, setSnackbar, errorStrings)
        .then((response: tp.RefreshDataGet) => {
            if (response !== null) {
                setInterface({
                    ...intrface,
                    data: {
                        [payload.page_id]: response.data[payload.page_id]
                    }
                })
            }
            setBackDrop(false)
        })
    }

    return (
        <>
        <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        >
            <Stack
            direction='column'
            flex={1}
            >
            <Select
            defaultValue=''
            size='small' 
            onChange={(event) => e_inputHandler(event.target.value)}
            MenuProps={{
                disableScrollLock: true,
            }}
            >
                <MenuItem value=''></MenuItem>
            {
            intrface.keys && intrface.keys[page_id] && (
                intrface.keys[page_id].map((key: tp.Keys, index: number) => (
                    <MenuItem key={index} value={key.name} >
                        {mt.getString(key.name, customStrings)}
                    </MenuItem>
                ))
            )
            }
            </Select>
            <FormHelperText style={{textAlign: 'center'}}>{commonStrings["column"]}</FormHelperText>
            </Stack>

            <Stack
            direction='column'
            flex={1}
            justifyContent='center'
            >
            <Select
            size='small' 
            onChange={(event) => mt.inputFixedHandler(setCpayload, 'operator', event.target.value)}
            MenuProps={{
                disableScrollLock: true,
            }}
            >
                {
                    type === 'Line' || type === 'Multiline' ? (
                        md.operators['Line'].map((operator: string, index: number) => (
                            <MenuItem key={index} value={operator}>{operator}</MenuItem>
                        ))
                    ) : type === 'True/False' ? (
                        md.operators['True/False'].map((operator: string, index: number) => (
                            <MenuItem key={index} value={operator}>{operator}</MenuItem>
                        ))
                    ) : type === 'Date & Time' || type === 'Date' ? (
                        md.operators['Date & Time'].map((operator: string, index: number) => (
                            <MenuItem key={index} value={operator}>{operator}</MenuItem>
                        ))
                    ) : type === 'Number' ? (
                        md.operators['Number'].map((operator: string, index: number) => (
                            <MenuItem key={index} value={operator}>{operator}</MenuItem>
                        ))
                    ) : type === 'Reference' ? (
                        md.operators['Reference'].map((operator: string, index: number) => (
                            <MenuItem key={index} value={operator}>{operator}</MenuItem>
                        ))
                    ) : type === 'Choice' ? (
                        md.operators['Choice'].map((operator: string, index: number) => (
                            <MenuItem key={index} value={operator}>{operator}</MenuItem>
                        ))
                    ) : null
                }
            </Select>
            <FormHelperText style={{textAlign: 'center'}}>{commonStrings["operator"]}</FormHelperText>
            </Stack>

            <Stack
            direction='column'
            flex={1}
            justifyContent='center'
            >
                {
                    type === 'Line' || type === 'Multiline' ? (
                        <TextField size='small' onChange={mt.inputHandler(setCpayload, 'value')}></TextField>
                    ) : type === 'True/False' ? (
                        <Select
                        size='small'
                        onChange={mt.selectHandler(setCpayload, 'value')}
                        MenuProps={{
                            disableScrollLock: true,
                        }}>
                            <MenuItem key={0} value={'True'}>True</MenuItem>
                            <MenuItem key={1} value={'False'}>False</MenuItem>
                        </Select>
                    ) : type === 'Date & Time' || type === 'Date' ? (
                        <TextField size='small' type='date' onChange={mt.inputHandler(setCpayload, 'value')}></TextField>
                    ) : type === 'Number' ? (
                        <TextField size='small' type='number' onChange={mt.inputHandler(setCpayload, 'value')}></TextField>
                    ) : type === 'Reference' ? (
                        <Reference
                        label=''
                        pageId={referencePageId}
                        data={{}}
                        setPayload={setCpayload}
                        />
                    ) : type === 'Choice' ? (
                        <TextField size='small' onChange={mt.inputHandler(setCpayload, 'value')}></TextField>
                    ) : (
                        <Select
                        size='small'
                        MenuProps={{disableScrollLock: true}}
                        />
                    )
                }
            <FormHelperText style={{textAlign: 'center'}}>{commonStrings["value"]}</FormHelperText>
            </Stack>
        </Stack>

        <Stack
        direction='row'
        justifyContent='space-between'
        marginTop={4}
        alignItems='end'
        >
            <List dense>
            {
                payload.searchSpec.map((condition: tp.SearchSpecification, index: number) => (
                    <ListItem key={index} disablePadding >
                        <IconButton edge='start' aria-label="delete" size='small' 
                            style={{marginRight: '3px'}}
                            onClick={() => removeCondition(index)}>
                            <Icon path={mdiClose} size={0.8} />
                        </IconButton>
                        {
                            typeof condition.value === 'string' ? (
                                <ListItemText
                                    primary={condition.filterCol + ' ' + condition.operator + ' ' + condition.value}
                                />
                            ): (
                                <ListItemText
                                    primary={condition.filterCol + ' ' + condition.operator + ' ' + condition.value?.name}
                                />
                            )
                        }
                    </ListItem>
                ))
            }
            </List>
            <Stack
            direction='row'
            spacing={2}
            >
                <Button onClick={() => addCondition()}>
                    {commonStrings["add"]}
                </Button>
                {
                    !disabled && (
                        <Button
                        color='primary'
                        size='small'
                        variant='contained'
                        onClick={() => runConditions()}
                        disabled={payload.searchSpec.length === 0}
                        >
                            {commonStrings["run"]}
                        </Button>
                    )
                }
            </Stack>
        </Stack>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    commonStrings: state.commonStrings,
    intrface: state.intrface,
    errorStrings: state.errorStrings,
    customStrings: state.customStrings,
    modules: state.modules
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload)),
    setInterface: (payload: tp.PageItemGet) => dispatch(setInterface(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
