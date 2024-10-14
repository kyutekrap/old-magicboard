import { mdiMenu } from "@mdi/js"
import Icon from "@mdi/react"
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Switch } from "@mui/material"
import { connect } from "react-redux"
import * as tp from '@/types'
import { useEffect, useState } from "react"


interface DragAndDropState {
    draggedFrom: number | null;
    draggedTo: number | null;
    isDragging: boolean;
    originalOrder: any[];
    updatedOrder: any[];
}

const initialDnDState: DragAndDropState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
};


const ColumnList = ({
    columns,
    setColumns,

    commonStrings
}: {
    columns: tp.Keys[],
    setColumns: Function,

    commonStrings: Record<string, string>
}) => {

    // Draggable (Start)
    const [dragAndDrop, setDragAndDrop] = useState<DragAndDropState>(initialDnDState);

    const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: columns,
        });
        
        event.dataTransfer.setData("text/html", '');
    };
    
    const onDragOver = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        
        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom || 0; 
        const draggedTo = Number(event.currentTarget.dataset.position); 
        
        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((_item, index) => index !== draggedFrom);
        
        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo),
        ];
        
        if (draggedTo !== dragAndDrop.draggedTo){
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo,
            });
        }
    };
    
    const onDrop = () => {
        setColumns(dragAndDrop.updatedOrder);
        
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false,
        });
    };
    
    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null,
        });
    };
    
    useEffect(() => {

    }, [dragAndDrop]);
    
    useEffect(() => {

    }, [columns]);
    // Draggable (End)

    // Column Item
    const ColumnItem = ({
        primary
    }: {
        primary: number
    }) => {
        return (
            <ListItem role="listitem">
                <ListItemIcon style={{
                    cursor: 'grab'
                }}>
                    <Icon path={mdiMenu} size={1} />
                </ListItemIcon>
                <ListItemText primary={columns[primary].name} />
                <Switch
                edge="end"
                size='small'
                checked={columns[primary].visibility}
                onChange={() => {
                    const updatedColumns = columns.map((column, index) => 
                        index === primary ? { ...column, visibility: !column.visibility } : column
                    )
                    setColumns(updatedColumns)
                }}
                />
            </ListItem>
        )
    }

    return (
        <>
        <List dense component="div" role="list">
            {
            columns.map((_column: tp.Keys, idx: number) => (
                <li 
                key={idx}
                data-position={idx}
                draggable
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragLeave={onDragLeave}
                className={dragAndDrop.draggedTo === idx ? "dropArea" : ""}
                >
                    <ColumnItem primary={idx} />
                </li>
            ))
            }
        </List>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    commonStrings: state.commonStrings
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnList)
