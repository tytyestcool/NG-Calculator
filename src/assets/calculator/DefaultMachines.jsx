import DefaultMachine from "./DefaultMachine.jsx";

function DefaultMachines(props) {

    const {DMachines= [], SMachines = [], addMachine} = props

    return (
        <div className={"DefaultMachineContainer"}>
        <h1 className={"DefaultMachinesTitle"}>Machines</h1>
            <div className={"DefaultMachinesList"}>
                {DMachines.map(machine => {
                    return (
                        <DefaultMachine key={machine.id} DMachine={machine} SMachines={SMachines} addMachine={addMachine} ></DefaultMachine>
                    )
                    })}
            </div>
        </div>
    )
}


export default DefaultMachines