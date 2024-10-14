import { Stack, Typography } from '@mui/material'
import * as mt from '@/method'
import { connect } from 'react-redux'
import * as tp from '@/types'
import CustomFab from '@/component/fab'


const Page1 = ({
    guestStrings,
    
}: {
    guestStrings: Record<string, string>,
    
}) => {

    return (
        <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        height='80vh'
        spacing={1}
        marginLeft={2}
        marginRight={2}
        >
            <Typography variant='h3' fontWeight={700}>Magic Board</Typography>
            {
                mt.isMobile() ? (
                    <Typography variant='h6' style={{textAlign: 'center', lineHeight: '1.2', marginBottom: '13px'}} 
                        whiteSpace="pre-line">
                        {mt.breakLine(guestStrings['tagline'])}
                    </Typography>
                ): (
                    <Typography variant='h6'>{guestStrings['tagline']}</Typography>
                )
            }

            <div style={{
                position: 'fixed',
                bottom: 20,
                right: 20
            }}
            >
                <CustomFab buttonAction={() => window.location.href = 'https://link-api.notion.site/Magic-Board-API-Docs-87e3358382804f79819c60018c2285c7?pvs=74'}>
                    <CustomFab.Title>Go to API Docs</CustomFab.Title>
                </CustomFab>
            </div>
        </Stack>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    guestStrings: state.guestStrings
})

const mapDispatchToProps = (dispatch: any) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Page1)
