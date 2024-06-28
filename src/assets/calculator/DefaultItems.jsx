import DefaultItem from "./DefaultItem.jsx";
import {useEffect, useState} from "react";

function DefaultItems(props) {

    const {DItems= [], SItems = [], addItem} = props

    const [Items, setItems] = useState([]);

    function filterItems(e) {
        console.log(e.target.value)
        setItems(DItems.filter(item => item.name.toLowerCase().includes((e.target.value).toLowerCase())))
    }

    useEffect(() => {
        setItems(DItems)

    }, [DItems])

    return (
        <div className={"DefaultItemContainer"}>
        <h1 className={"DefaultItemsTitle"}>Items</h1>
            <input className={"DefaultItemInput"} type={"text"} placeholder={"Cherche un item"} onChange={(e) => filterItems(e)} />
            <div className={"DefaultItemsList"}>
                {Items.map(Item => {
                    return (
                        <DefaultItem key={Item.id} DItem={Item} SItems={SItems} addItem={addItem} ></DefaultItem>
                    )
                    })}
            </div>
        </div>
    )
}


export default DefaultItems