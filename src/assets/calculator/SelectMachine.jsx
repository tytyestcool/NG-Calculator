
function SelectMachine(props) {

    const { DMachines = [], SMachine = {}, setMachine, clearMachine } = props

    return (
        <div className={"SelectMachine"}>
            <h3 className={"SelectMachineTitle"}>{SMachine.name}</h3>
            <h3 className={"SelectMachineTitle"}>Nombre : {SMachine.nb}</h3>
            <button onClick={() => clearMachine(SMachine.id)} className={"SelectMachineClearBtn"}><i
                className="bi bi-trash"></i></button>
            <input type={"number"} className={"SelectMachineInput"} min={1} max={9999} value={SMachine.nb}
                   onChange={(e) => setMachine(e, SMachine.id)}/>


        </div>
    )
}

export default SelectMachine