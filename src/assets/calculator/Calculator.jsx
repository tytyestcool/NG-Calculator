import NavBar from "../Main/NavBar.jsx";
import {useEffect, useState} from "react";
import Machinesdata from "./Machines.json";
import Craftdata from "./Items.json";
import DefaultMachines from "./DefaultMachines.jsx";
import SelectMachines from "./SelectMachines.jsx";
import CraftInfos from "./CraftInfos.jsx";

function CalculatorPage() {

    const [DefaultMachinesList, setDefaultMachinesList] = useState([]);

    const [SelectMachinesList, setSelectMachinesList] = useState([]);

    const [CraftInfo, setCraftInfo] = useState([]);

    const [Step, setStep] = useState(-1);


    useEffect(() => {
        setDefaultMachinesList(Machinesdata)
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

    function craftToArray(craft, nb) {
        let res = []
        for(let i = 0; i < craft.length; i++) {
            if(craft[i].length > 0) {
                for (let j = 0; j < craft[i].length; j++) {
                    let index = res.findIndex(item => item.id === craft[i][j]);

                    if(craft[i][j] !== 0) {
                        if(index !== -1) {
                            res[index].nb = Math.round(res[index].nb + nb);
                        } else {
                            res.push({
                                "id": craft[i][j],
                                "nb": nb
                            })
                        }
                    }

                }
            } else {
                let index = res.findIndex(item => item.id === craft[i]);

                if(craft[i] !== 0) {

                    if (index !== -1) {
                        res[index].nb = Math.round(res[index].nb + nb);
                    } else {
                        res.push({
                            "id": craft[i],
                            "nb": nb
                        })
                    }
                }

            }
        }
        console.log(res)
        return res
    }

    function infosCraft() {
        let steps = [{
            "id" : 0,
            "crafts" : [],
            "resources" : [],
            "toCraft" : []
        }];
        let i = 0;
        let resources = [];

        SelectMachinesList.forEach(machine => {
            let crafts= []

            crafts = crafts.concat(craftToArray(machine.craft, parseInt(machine.nb)))

            steps[0].crafts = steps[0].crafts.concat(crafts)
            steps[0].toCraft.push({
                "id": machine.id,
                "name" : machine.name,
                "nb" : machine.nb,
                "craft" : false
            })
        })

        console.log(steps)


        while (steps.find(step => step.id === i).crafts.length > 0) {
            let iteminfo = steps.find(step => step.id === i)
            let item = Craftdata.find(item => item.id === iteminfo.crafts[0].id)
            if(!item.final) {
                let index2 = steps.findIndex(step => step.id === i+1)
                console.log(iteminfo)
                if(index2 !== -1) {
                    console.log("add")
                    steps[index2].crafts = steps[index2].crafts.concat(craftToArray(item.craft, Math.ceil((1/item.amount)*parseInt(iteminfo.crafts[0].nb))))
                } else {
                    steps.push({
                        "id" : i+1,
                        "crafts" : craftToArray(item.craft, Math.ceil((1/item.amount)*parseInt(iteminfo.crafts[0].nb))),
                        "resources" : [],
                        "toCraft" : []
                    })
                }


            } else {
                let index = resources.findIndex(resource => resource.id === item.id)
                if(index !== -1) {
                    resources[index].nb +=  Math.ceil((1/item.amount)*parseInt(iteminfo.crafts[0].nb)) ;
                } else {
                    resources.push({
                        "id": item.id,
                        "name" : item.name,
                        "nb" : Math.ceil((1/item.amount)*parseInt(iteminfo.crafts[0].nb))
                    })
                }
            }
            let index = iteminfo.resources.findIndex(resource => resource.id === item.id)
            if(index !== -1) {
                iteminfo.resources[index].nb += parseInt(iteminfo.crafts[0].nb);
            } else {
                iteminfo.resources.push({
                    "id": item.id,
                    "name" : item.name,
                    "nb" :  parseInt(iteminfo.crafts[0].nb),
                    "craft" : false
                })
            }
            iteminfo.crafts.splice(0, 1)
            if(iteminfo.crafts.length === 0){
                iteminfo.resources.forEach(resource => {
                    let item = Craftdata.find(item => item.id === resource.id)
                    if(!item.final) {
                        steps.find(step => step.id === i+1).toCraft.push(resource)
                    }
                })
                if(!steps.find(step => step.id === i+1)) {
                    break
                } else {
                    i++;
                }
            }
        }

        console.log(resources)

        return steps
    }

    function validate(id) {
        console.log(CraftInfo[CraftInfo.length-1-Step])
        const index = CraftInfo[CraftInfo.length-1-Step].resources.findIndex(machine => machine.id === id)

        console.log(index)

        if(index !== -1) {
            const NSMachine = [...CraftInfo]
            CraftInfo[CraftInfo.length-1-Step].resources[index].craft = true;
            setCraftInfo(NSMachine)
        }

        console.log(CraftInfo)
    }

    function craft() {
        console.log("craft")
        let res = infosCraft()
        console.log(res)
        setCraftInfo(res)
        setStep(0)
        setSelectMachinesList([])
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
                <DefaultMachines DMachines={DefaultMachinesList} SMachines={SelectMachinesList} addMachine={addMachine} />
                {Step>=0?<CraftInfos CraftInfo={CraftInfo} Step={Step} SetStep={setStep} validate={validate} />:""}
                <SelectMachines DMachines={DefaultMachinesList} SMachines={SelectMachinesList} craft={craft} setMachine={setMachine} clearMachine={clearMachine} />
            </div>
        </>
    )
}

export default CalculatorPage