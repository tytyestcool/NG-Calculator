import SelectItem from "./SelectItem.jsx";

function SelectItems(props) {

    const {DItems= [], SItems = [], setItem, clearItem, craft} = props

    return (
        <div className={"SelectItemContainer"}>
            <h1 className={"SelectItemsTitle"}>Selection</h1>
            <div className={"SelectItemsList"}>
                {SItems.map(Item => {
                    return (<SelectItem key={Item.id} DItems={DItems} SItem={Item} setItem={setItem} clearItem={clearItem}/>)
                })}
            </div>
            <div className={"CraftBtnContainer"} >
                <button className={"CraftBtn"} onClick={craft}>Craft</button>
            </div>

        </div>
    )
}


export default SelectItems