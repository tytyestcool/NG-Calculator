import NavBar from "../Main/NavBar.jsx";
import {useEffect, useState} from "react";
import Itemsdata from "./Items.json";
import DefaultItems from "./DefaultItems.jsx";
import SelectItems from "./SelectItems.jsx";
import CraftInfos from "./CraftInfos.jsx";
import CraftResources from "./CraftResources.jsx";
import howToCraft from "./HowToCraft.jsx";

function CraftingPage() {

    const [DefaultItemsList, setDefaultItemsList] = useState([]);

    const [SelectItemsList, setSelectItemsList] = useState([]);

    const [CraftInfo, setCraftInfo] = useState([]);

    const [Step, setStep] = useState(-1);

    const [Resources, setResources] = useState([]);

    const [HowToCraftInfo, setHowToCraftInfo] = useState(null)

    useEffect(() => {
        let items = [...Itemsdata]
        items = items.filter(item => item.final === false)
        setDefaultItemsList(items)
    }, [])


    function setHowtoCraft(id) {
        const infos = [...Itemsdata]
        let iteminfos = infos.find(item => item.id === id)
        console.log(iteminfos)
        if(HowToCraftInfo === null || HowToCraftInfo.id !== id ) {
            setHowToCraftInfo(iteminfos)
        } else {
            setHowToCraftInfo(null)
        }


    }

    function addItem(id) {
        const index = DefaultItemsList.findIndex(Item => Item.id === id);
        const selectIndex = SelectItemsList.findIndex(Item => Item.id === id);

        console.log(id, index, selectIndex)

        const copySelectItemsList = [...SelectItemsList];

        if (selectIndex !== -1) {
            const copySelectItemsList = [...SelectItemsList];
            copySelectItemsList[selectIndex].nb++;
            setSelectItemsList(copySelectItemsList);
        } else if (index !== -1) {

            const NSItem = Object.assign({}, DefaultItemsList[index]);

            NSItem.nb++;
            copySelectItemsList.push(NSItem);
            setSelectItemsList(copySelectItemsList);
        }
    }

    function setItem(e, id) {

        let value = e.target.value;

        const index = SelectItemsList.findIndex(Item => Item.id === id);

        if(index !== -1) {
            if(value > 0) {
                const copySelectItemsList = [...SelectItemsList];
                copySelectItemsList[index].nb = value
                setSelectItemsList(copySelectItemsList);
            } else {
                const copySelectItemsList = [...SelectItemsList];
                copySelectItemsList[index].nb = 1
                setSelectItemsList(copySelectItemsList);
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

        SelectItemsList.forEach(Item => {
            let crafts= []

            crafts = crafts.concat(craftToArray(Item.craft, parseInt(Item.nb)))

            steps[0].crafts = steps[0].crafts.concat(crafts)
            steps[0].toCraft.push({
                "id": Item.id,
                "name" : Item.name,
                "nb" : Item.nb,
                "craft" : false
            })
        })

        while (steps.find(step => step.id === i).crafts.length > 0) {
            let iteminfo = steps.find(step => step.id === i)
            let item = Itemsdata.find(item => item.id === iteminfo.crafts[0].id)
            if(!item.final) {
                let index2 = steps.findIndex(step => step.id === i+1)

                if(index2 !== -1) {
                    steps[index2].crafts = steps[index2].crafts.concat(craftToArray(item.craft, Math.ceil((1/item.amount)*parseInt(iteminfo.crafts[0].nb))))
                } else {
                    steps.push({
                        "id" : i+1,
                        "crafts" : craftToArray(item.craft, Math.ceil((1/item.amount)*parseInt(iteminfo.crafts[0].nb))),
                        "resources" : [],
                        "toCraft" : []
                    })
                }
            }
            let index = resources.findIndex(resource => resource.id === item.id)
            if(index !== -1) {
                resources[index].nb += parseInt(iteminfo.crafts[0].nb);
            } else {
                resources.push({
                    "id": item.id,
                    "name" : item.name,
                    "nb" : parseInt(iteminfo.crafts[0].nb),
                    "final" : item.final,
                    "craft" : 0
                })
            }

            let index3 = iteminfo.resources.findIndex(resource => resource.id === item.id)
            if(index3 !== -1) {
                iteminfo.resources[index3].nb += parseInt(iteminfo.crafts[0].nb);
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
                    let item = Itemsdata.find(item => item.id === resource.id)
                    if(!item.final) {
                        steps.find(step => step.id === i+1).toCraft.push(resource)
                    }
                })
                if(!steps.find(step => step.id === i+1)) {
                    break
                } else {
                    i++;
                    if(i>20) {
                        break
                    }
                }
            }
        }

        setResources(resources)
        return steps
    }

    function valideAll() {

        CraftInfo[CraftInfo.length-1-Step].resources.forEach(resource => {
            validate(resource.id)
        })

    }

    function validate(id) {

        const index = CraftInfo[CraftInfo.length-1-Step].resources.findIndex(item => item.id === id)

        if(index !== -1) {
            const NewCraftInfo = [...CraftInfo]
            NewCraftInfo[CraftInfo.length-1-Step].resources[index].craft = !CraftInfo[CraftInfo.length-1-Step].resources[index].craft ;
            setCraftInfo(NewCraftInfo)
        }

        const index2 = Resources.findIndex(item => item.id === id)

        if(index2 !== -1) {
            const NewResources = [...Resources]
            if(CraftInfo[CraftInfo.length-1-Step].resources[index].craft === true) {
                NewResources[index2].craft += CraftInfo[CraftInfo.length-1-Step].resources[index].nb ;
            } else {
                NewResources[index2].craft -= CraftInfo[CraftInfo.length-1-Step].resources[index].nb ;
            }

            setResources(NewResources)
        }

    }

    function craftEnd() {
        setResources([])
        setCraftInfo([])
        setStep(-1)
        setHowToCraftInfo(null)
    }

    function craft() {
        let res = infosCraft()
        setCraftInfo(res)
        setStep(0)
        setSelectItemsList([])
        setHowToCraftInfo(null)
    }

    function clearItem(id) {
        const index = SelectItemsList.findIndex(Item => Item.id === id)

        if(index !== -1) {
            const NSItem = [...SelectItemsList]
            NSItem.splice(index, 1)
            setSelectItemsList(NSItem)
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <div className={"Calculator"}>
                <DefaultItems DItems={DefaultItemsList} SItems={SelectItemsList} addItem={addItem} />
                {Step>=0?<CraftInfos setHowtoCraft={setHowtoCraft} HowToCraftInfo={HowToCraftInfo} CraftInfo={CraftInfo} craftEnd={craftEnd} Step={Step} setStep={setStep} validate={validate} valideAll={valideAll}/>:""}
                {SelectItemsList.length>0?
                    <SelectItems DItems={DefaultItemsList} SItems={SelectItemsList} craft={craft} setItem={setItem} clearItem={clearItem} />:""}
                {Resources.length>0?<CraftResources resources={Resources} />:""}
            </div>
        </>
    )
}

export default CraftingPage