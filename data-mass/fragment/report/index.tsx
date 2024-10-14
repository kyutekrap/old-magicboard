import { Button, FormControlLabel, FormHelperText, IconButton, List, ListItem, ListItemText, ListSubheader, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material"
import lightBlue from "@mui/material/colors/lightBlue"
import { connect } from "react-redux"
import { mdiClose, mdiPlus } from "@mdi/js"
import Icon from "@mdi/react"
import { useEffect, useState } from "react"
import { useTheme } from '@mui/material/styles'
import * as tp from '@/types'
import * as mt from '@/method'
import * as md from '@/metadata'


const Report = ({
    page_id,

    commonStrings,
    intrface,
    customStrings,
    modules
}: {
    page_id: string,

    commonStrings: Record<string, string>,
    intrface: tp.PageItemGet,
    customStrings: Record<string, string>,
    modules: tp.Modules[]
}) => {

    // Theme
    const theme = useTheme()

    // Module
    const [module, setModule] = useState('')
    useEffect(() => {
        const module = modules.filter(module => module.activated)
        if (module.length > 0) setModule(module[0].module_id)
    }, [modules])

    // Payload
    const [payload, setPayload] = useState<tp.ReportPost>({
        module_id: '',
        visualization: 'none',
        columns: [],
        groupBy: [],
        filter: []
    })

    // Visualization Types
    const [visualizationTypes] = useState<string[]>(['bar', 'line', 'scatter', 'none'])

    // Current Column
    const [column, setColumn] = useState<string>('')
    const addColumn = () => {
        if (!mt.validateString(column)) return
        if (payload.columns.includes(column)) return
        setPayload({...payload, columns: [...payload['columns'], column]})
    }

    // Current Group By
    const [groupBy, setGroupBy] = useState<tp.GroupBy>({
        filterCol: '',
        operator: ''
    })
    const addGroupBy = () => {
        if (!mt.validateForm(groupBy)) return
        if (payload.groupBy.includes(groupBy)) return
        setPayload({...payload, groupBy: [...payload.groupBy, groupBy]})
    }

    // Current Filter
    const [type, setType] = useState<string>('')
    const [filter, setFilter] = useState<tp.SearchSpecification>({
        filterCol: '',
        operator: '',
        value: '',
    })
    const addFilter = () => {
        if (!(mt.validateString(filter.filterCol) && mt.validateString(filter.operator))) return
        if (type !== 'CHECKBOX' && !mt.validateString(filter.value)) return
        if (payload.filter.includes(filter)) return
        mt.inputFixedHandler(setPayload, 'filter', payload.filter.concat([filter]))
    }
    // Override input handler
    const e_inputHandler = (value: string) => {
        mt.inputFixedHandler(setFilter, 'filterCol', value)
        if (mt.validateString(value))
            setType(intrface.keys[page_id].find(key => key.name === value)?.type ?? '')
    }

    // List Item
    const Item = ({
        primary,
        onClick
    }: {
        primary: string,
        onClick: any
    }) => {
        return (
            <ListItem style={{ padding: '0px 10px 0px 10px' }} >
                <IconButton edge='start' aria-label="delete" size='small' style={{marginRight: '3px'}}
                onClick={onClick}
                >
                    <Icon path={mdiClose} size={0.8} />
                </IconButton>
                <ListItemText
                    primary={mt.getString(primary, customStrings)}
                />
            </ListItem>
        )
    }

    // Run Report
    const runReport = () => {
        setPayload({...payload, module_id: module})
        // Invoke web srv
        window.open('/dashboard/report', '_blank')
    }

    return (
        <Paper elevation={0} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
        <Stack
        direction='column'
        spacing={2}
        >
            {/* Visualization */}
            <Stack
            direction='column'
            >
                <Typography variant='subtitle2'>{commonStrings["visualization"]}</Typography>
                <RadioGroup row>
                    {
                        visualizationTypes.map(type => (
                            <FormControlLabel
                            key={type}
                            value={type}
                            control={
                                <Radio size="small"
                                checked={payload.visualization === type}
                                onChange={mt.inputHandler(setPayload, 'visualization')}
                                />
                            }
                            label={mt.getString(type, commonStrings)} 
                            />
                        ))
                    }
                </RadioGroup>
            </Stack>
            
            {/* Columns */}
            <Stack
            direction='column'
            spacing={1}
            >
                <Stack
                direction='row'
                alignItems='center'
                spacing={0.5}
                >
                    <IconButton edge='start' size='small' onClick={() => addColumn()}>
                        <Icon path={mdiPlus} size={0.6} />
                    </IconButton>
                    <Typography variant='subtitle2'>{commonStrings["columns"]}</Typography>
                </Stack>
                <Stack
                direction='row'
                justifyContent='space-between'
                spacing={1}
                >
                    <Stack
                    direction='column'
                    justifyContent='center'
                    flex={1}
                    >
                        <Select
                        defaultValue=''
                        size='small'
                        onChange={(event) => setColumn(event.target.value)}
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                        >
                            <MenuItem value=''></MenuItem>
                        {
                        intrface.keys[page_id].map((key: tp.Keys, index: number) => (
                            !payload.columns.includes(key.name) && (
                                <MenuItem key={index} value={key.name} >
                                    {mt.getString(key.name, customStrings)}
                                </MenuItem>
                            )
                        ))
                        }
                        </Select>
                        <FormHelperText style={{textAlign: 'center'}}>{commonStrings["columns"]}</FormHelperText>
                    </Stack>
                    <div style={{flex: 1}}></div>
                    <div style={{flex: 1}}></div>
                </Stack>
            </Stack>
            
            {/* Group By */}
            <Stack
            direction='column'
            spacing={1}
            >
            <Stack
            direction='row'
            alignItems='center'
            spacing={0.5}
            >
                <IconButton edge='start' size='small' onClick={() => addGroupBy()}>
                    <Icon path={mdiPlus} size={0.6} />
                </IconButton>
                <Typography variant='subtitle2'>{commonStrings["groupBy"]}</Typography>
            </Stack>
            <Stack
            direction='row'
            justifyContent='space-between'
            spacing={1}
            >
                <Stack
                direction='column'
                justifyContent='center'
                flex={1}
                >
                    <Select
                    defaultValue=''
                    size='small' 
                    onChange={ mt.selectHandler(setGroupBy, 'filterCol') }
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                    >
                        <MenuItem value=''></MenuItem>
                    {
                    intrface.keys[page_id].map((key: tp.Keys, index: number) => (
                        <MenuItem key={index} value={key.name} >
                            {mt.getString(key.name, customStrings)}
                        </MenuItem>
                    ))
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
                    onChange={mt.selectHandler(setGroupBy, 'operator')}
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                    >
                        {
                            mt.validateString(groupBy.filterCol) && (
                                intrface.keys[page_id].find(key => key.name === groupBy.filterCol)?.type.startsWith('DATE') ? (
                                    md.groupBy.DATETIME.map(item => (
                                        <MenuItem value={item} key={item}>{item}</MenuItem>
                                    ))
                                ) : (
                                    md.groupBy.Line.map(item => (
                                        <MenuItem value={item} key={item}>{item}</MenuItem>
                                    ))
                                )
                            )
                        }
                    </Select>
                    <FormHelperText style={{textAlign: 'center'}}>{commonStrings["operator"]}</FormHelperText>
                </Stack>
                <div style={{flex: 1}}></div>
            </Stack>
            </Stack>

            {/* Filter */}
            <Stack
            direction='column'
            spacing={1}
            >
            <Stack
            direction='row'
            alignItems='center'
            spacing={0.5}
            >
                <IconButton edge='start' size='small' onClick={() => addFilter()}>
                    <Icon path={mdiPlus} size={0.6} />
                </IconButton>
                <Typography variant='subtitle2'>{commonStrings["filter"]}</Typography>
            </Stack>
            <Stack
            direction='row'
            justifyContent='space-between'
            spacing={1}
            >
                <Stack
                direction='column'
                justifyContent='center'
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
                    intrface.keys[page_id].map((key: tp.Keys, index: number) => (
                        <MenuItem key={index} value={key.name} >
                            {mt.getString(key.name, customStrings)}
                        </MenuItem>
                    ))
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
                    onChange={mt.selectHandler(setFilter, 'operator')}
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                    >
                    {
                        type === 'Line' || type === 'Multiline' || type === 'Reference' ? (
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
                        ) : type === 'Percentage' || type === 'Number' ? (
                            md.operators['Number'].map((operator: string, index: number) => (
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
                        type === 'Line' || type === 'Multiline' || type === 'Reference' ? (
                            <TextField size='small' onChange={mt.inputHandler(setFilter, 'value')}></TextField>
                        ) : type === 'True/False' ? (
                            <Select
                            size='small'
                            MenuProps={{
                                disableScrollLock: true,
                            }}
                            ></Select>
                        ) : type === 'Date & Time' || type === 'Date' ? (
                            <TextField size='small' type='date' onChange={mt.inputHandler(setFilter, 'value')}></TextField>
                        ) : type === 'Percentage' || type === 'Number' ? (
                            <TextField size='small' type='number' onChange={mt.inputHandler(setFilter, 'value')}></TextField>
                        ) : (
                            <Select
                            size='small'
                            MenuProps={{
                                disableScrollLock: true,
                            }}
                            ></Select>
                        )
                    }
                    <FormHelperText style={{textAlign: 'center'}}>{commonStrings["value"]}</FormHelperText>
                </Stack>
            </Stack>
            </Stack>
        </Stack>

        <Stack
        direction='row'
        justifyContent='space-between'
        marginTop={4}
        alignItems='end'
        spacing={2}
        >
            <Stack
            direction='column'
            style={{
                flex: 1,
                borderRadius: '3px',
                borderWidth: '1px',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }}
            >
                <List dense subheader={
                    <ListSubheader component="div">
                        {commonStrings["columns"]}
                    </ListSubheader>
                }>
                    {
                        payload.columns.map((column: string) => (
                            <Item
                            primary={column}
                            onClick={() => setPayload({...payload, columns: payload.columns.filter(col => col !== column)})}
                            key={column} />
                        ))
                    }
                </List>
                <List dense subheader={
                    <ListSubheader component="div">
                        {commonStrings["groupBy"]}
                    </ListSubheader>
                }>
                    {
                        payload.groupBy.map((column: tp.GroupBy, index: number) => (
                            <Item
                            primary={`${column.filterCol} • ${column.operator}`}
                            onClick={() => setPayload({...payload, groupBy: payload.groupBy.filter(gb => gb !== column)})}
                            key={index} />
                        ))
                    }
                </List>
                <List dense subheader={
                    <ListSubheader component="div">
                        {commonStrings["filter"]}
                    </ListSubheader>
                }>
                    {
                        payload.filter.map((column: tp.SearchSpecification, index: number) => (
                            <Item
                            primary={`${column.filterCol} ${column.operator} ${column.value}`}
                            onClick={() => setPayload({...payload, filter: payload.filter.filter(fil => fil !== column)})}
                            key={index} />
                        ))
                    }
                </List>
            </Stack>
            <Stack
            direction='row'
            spacing={2}
            >
                <Button color='success' size='small' variant='contained' style={{background: lightBlue[700]}}
                    onClick={() => runReport()}>
                    {commonStrings["run"]}
                </Button>
            </Stack>
        </Stack>
        </Paper>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    commonStrings: state.commonStrings,
    intrface: state.intrface,
    customStrings: state.customStrings,
    modules: state.modules
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
