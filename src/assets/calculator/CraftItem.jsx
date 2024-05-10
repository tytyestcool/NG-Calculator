
function CraftItem(props) {

    const { item, validate } = props

    return (
        <div className={"CraftItem " + (item.craft?"CraftItemValidate":"") }>
            <h3 className={"CraftItemTitle"}>{item.nb} {item.name}</h3>
            <button onClick={() => validate(item.id)} className={"CraftItemValidateBtn"}><i
                className="bi bi-check-lg"></i></button>


        </div>
    )
}

export default CraftItem