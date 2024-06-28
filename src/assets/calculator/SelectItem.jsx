
function SelectItem(props) {

    const { DItems = [], SItem = {}, setItem, clearItem } = props

    return (
        <div className={"SelectItem"}>
            <h3 className={"SelectItemTitle"}>{SItem.nb} {SItem.name}</h3>
            <button onClick={() => clearItem(SItem.id)} className={"SelectItemClearBtn"}><i
                className="bi bi-trash"></i></button>
            <input type={"number"} className={"SelectItemInput"} min={1} max={9999} value={SItem.nb}
                   onChange={(e) => setItem(e, SItem.id)}/>


        </div>
    )
}

export default SelectItem