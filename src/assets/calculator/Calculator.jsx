import NavBar from "../Main/NavBar.jsx";
import {useEffect, useState} from "react";
import data from "./Machines.json";
import DefaultMachines from "./DefaultMachines.jsx";
import SelectMachines from "./SelectMachines.jsx";
import selectMachines from "./SelectMachines.jsx";

function CalculatorPage() {

    const [DefaultMachinesList, setDefaultMachinesList] = useState([]);

    const [SelectMachinesList, setSelectMachinesList] = useState([]);

    useEffect(() => {
        setDefaultMachinesList(data)
    }, [])


    function addMachine(id) {
        console.log(id);
        const index = DefaultMachinesList.findIndex(machine => machine.id === id);
        const selectIndex = SelectMachinesList.findIndex(machine => machine.id === id);
        console.log(index, selectIndex);

        const copySelectMachinesList = [...SelectMachinesList];

        if (selectIndex !== -1) {
            const copySelectMachinesList = [...SelectMachinesList];
            copySelectMachinesList[selectIndex].nb++;
            setSelectMachinesList(copySelectMachinesList);
        } else if (index !== -1) {

            const NSMachine = Object.assign({}, DefaultMachinesList[index]);

            NSMachine.nb++;
            copySelectMachinesList.push(NSMachine);
            setSelectMachinesList(copySelectMachinesList);
        }
    }

    function setMachine(e, id) {

        let value = e.target.value;

        console.log(value)

        const index = SelectMachinesList.findIndex(machine => machine.id === id);

        console.log(index)

        if(index !== -1) {
            if(value > 0) {
                const copySelectMachinesList = [...SelectMachinesList];
                copySelectMachinesList[index].nb = value
                setSelectMachinesList(copySelectMachinesList);
            } else {
                const copySelectMachinesList = [...SelectMachinesList];
                copySelectMachinesList[index].nb = 1
                setSelectMachinesList(copySelectMachinesList);
            }

        }

    }

    function craft() {
        console.log("craft")
    }

    function clearMachine(id) {
        console.log(id)
        const index = SelectMachinesList.findIndex(machine => machine.id === id)

        if(index !== -1) {
            const NSMachine = [...SelectMachinesList]
            NSMachine.splice(index, 1)
            setSelectMachinesList(NSMachine)
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <div className={"Calculator"}>
                <DefaultMachines DMachines={DefaultMachinesList} SMachines={SelectMachinesList} addMachine={addMachine} ></DefaultMachines>
                <SelectMachines DMachines={DefaultMachinesList} SMachines={SelectMachinesList} craft={craft} setMachine={setMachine} clearMachine={clearMachine} ></SelectMachines>
            </div>
        </>
    )
}

export default CalculatorPage