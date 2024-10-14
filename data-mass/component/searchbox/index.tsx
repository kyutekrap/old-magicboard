import { InputBase } from "@mui/material"
import { connect } from "react-redux"
import * as tp from '@/types'


const Searchbox = ({
    onChange,
    onKeyDown,
    searchText,

    commonStrings
}: {
    onChange: Function,
    onKeyDown: Function,
    searchText: string,

    commonStrings: Record<string, string>
}) => {

    return (
        <InputBase
        placeholder={commonStrings["searchText"]}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => onKeyDown(event)}
        value={searchText}
        />
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    commonStrings: state.commonStrings
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbox)
