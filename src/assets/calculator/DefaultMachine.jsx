
function DefaultMachine(props) {

    const { DMachine = {}, SMachines = [] , addMachine  } = props

    return (
        <div className={"DefaultMachine"}>
            <h3 className={"DefaultMachineTitle"}>{DMachine.name}</h3>
            <button onClick={() => addMachine(DMachine.id)} className={"DefaultMachineAddBtn"}><i
                className="bi bi-plus"></i></button>

        </div>
    )
}

export default DefaultMachine