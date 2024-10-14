import { Stack, Typography, Link } from "@mui/material"
import { connect } from "react-redux"
import * as tp from '@/types'
import * as mt from '@/method'


const CustomLink = ({
    type,
    label,
    data,
    page_id,

    customStrings,
    roles
}: {
    type: 'fieldset' | 'field',
    label: string,
    data: Record<string, any>,
    page_id: string,

    customStrings: Record<string, string>,
    roles: tp.Roles
}) => {

    return (
        type === 'fieldset' ? (
            <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
                <Typography variant='subtitle2' flex={1}>{mt.getString(label ?? '', customStrings)}</Typography>
                {
                    mt.validateRole(roles, "read", page_id) ? (
                        <Link
                        color='inherit'
                        onClick={() => window.location.href = '/dashboard?id=' + page_id + '&item=' + data[label]._id}
                        style={{ cursor: 'pointer' }}
                        >
                            {data[label] ? data[label].name : ''}
                        </Link>
                    ): (
                        data[label] ? data[label].name : ''
                    )
                }
            </Stack>
        ): type === 'field' ? (
            mt.validateRole(roles, "read", page_id) ? (
                <Link
                color='inherit'
                onClick={() => window.location.href = '/dashboard?id=' + page_id + '&item=' + data._id}
                >
                    {data[label] ? data[label]?.name : ''}
                </Link>
            ): (
                data[label] ? data[label].name : ''
            )
        ): null
    )
}


const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings,
    roles: state.roles
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomLink)
