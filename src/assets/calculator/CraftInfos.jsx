import CraftItem from "./CraftItem.jsx";


function CraftInfos(props) {

    const {CraftInfo, Step , SetStep, validate} = props;

    return (
        <div className={"CraftInfos"}>
            <h1 className={"CraftInfosTitle"} >{CraftInfo[CraftInfo.length - 1 - Step].toCraft.map(item => item.nb + " " + item.name).join(', ')}</h1>
            <div className={"CraftStepInfo"}>
                {CraftInfo[CraftInfo.length - 1 - Step].resources.map(resourse => {

                    return (
                        <CraftItem item={resourse} validate={validate}/>
                    )

                })}
            </div>
            <div className={"StepBtns"}>
                <button className={"StepBtnMinus"} disabled={Step === 0} onClick={() => SetStep(Step - 1)}> - 1</button>
                <h2 className={"StepTitle"}>Etape : {Step + 1}</h2>
                <button className={"StepBtnPlus"} disabled={Step === CraftInfo.length - 1}
                        onClick={() => SetStep(Step + 1)}> + 1
                </button>
            </div>
        </div>
    )

}

export default CraftInfos;