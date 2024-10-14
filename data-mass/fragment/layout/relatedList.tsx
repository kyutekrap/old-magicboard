import { mdiMenu } from "@mdi/js"
import Icon from "@mdi/react"
import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { connect } from "react-redux"
import * as tp from '@/types'
import { useEffect, useState } from "react"
import * as mt from '@/method'

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

const RelatedList = ({
    lists,
    setLists,

    customStrings,
    pages
}: {
    lists: tp.RelatedList[],
    setLists: Function,

    customStrings: Record<string, string>,
    pages: tp.Pages[]
}) => {

    // Draggable (Start)
    const [dragAndDrop, setDragAndDrop] = useState<DragAndDropState>(initialDnDState);

    const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: lists,
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
        setLists(dragAndDrop.updatedOrder);
        
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

    }, [lists]);
    // Draggable (End)

    const handleChange = (list: tp.RelatedList) => {
        setLists(lists.map(l => {
            if (l._id === list._id) {
                return {
                    '_id': list._id,
                    'visibility': !list.visibility
                }
            } return l
        }))
    }

    // Page Item
    const PageItem = ({
        list
    }: {
        list: tp.RelatedList
    }) => {
        return (
            <ListItem
            role="listitem"
            secondaryAction={
                <Checkbox
                checked={list.visibility}
                onChange={() => handleChange(list)}
                />
            }>
                <ListItemText
                primary={mt.getString(pages.find(page => page.page_id === list._id)?.page_name ?? '', customStrings)} 
                />
            </ListItem>
        )
    }

    return (
        <>
        <List dense component="div" role="list" style={{
            overflow: 'auto'
        }}>
            {
                lists.map((list: tp.RelatedList, idx: number) => (
                    <PageItem list={list} key={idx} />
                ))
            }
        </List>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings,
    pages: state.pages 
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedList)
