import SelectMachine from "./SelectMachine.jsx";

function SelectMachines(props) {

    const {DMachines= [], SMachines = [], setMachine, clearMachine, craft} = props

    return (
        <div className={"SelectMachineContainer"}>
            <h1 className={"SelectMachinesTitle"}>Selection</h1>
            <div className={"SelectMachinesList"}>
                {SMachines.map(machine => {
                    return (<SelectMachine key={machine.id} DMachines={DMachines} SMachine={machine} setMachine={setMachine} clearMachine={clearMachine}/>)
                })}
            </div>
            <div className={"CraftBtnContainer"} >
                <button className={"CraftBtn"} onClick={craft}>Craft</button>
            </div>

        </div>
    )
}


export default SelectMachines