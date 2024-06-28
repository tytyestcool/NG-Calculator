
function DefaultItem(props) {

    const { DItem = {}, SItems = [] , addItem  } = props

    return (
        <div className={"DefaultItem"}>
            <h3 className={"DefaultItemTitle"}>{DItem.name}</h3>
            {DItem.craft.length>0?<button onClick={() => addItem(DItem.id)} className={"DefaultItemAddBtn"}><i
                className="bi bi-plus"></i></button>:""}

        </div>
    )
}

export default DefaultItem