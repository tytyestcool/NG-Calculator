import CraftItem from "./CraftItem.jsx";
import HowToCraft from "./HowToCraft.jsx";


function CraftInfos(props) {

    // eslint-disable-next-line react/prop-types
    const {CraftInfo = [], Step , setStep, validate, valideAll, craftEnd, setHowtoCraft, HowToCraftInfo} = props;

    return (
        <div className={"CraftInfos"}>
            <h1 className={"CraftInfosTitle"} >{CraftInfo[CraftInfo.length - 1 - Step].toCraft.map(item => item.nb + " " + item.name).join(', ')}</h1>
            <div className={"CraftStepInfo"}>
                {CraftInfo[CraftInfo.length - 1 - Step].resources.map(resourse => {

                    return (
                        <CraftItem key={resourse.id} item={resourse} validate={validate} setHowToCraft={setHowtoCraft} />
                    )

                })}
                <div>

                </div>
            </div>
            <div className={"StepBtns"}>
                <button className={"StepBtnMinus"} disabled={Step === 0} onClick={() => setStep(Step - 1)}><i className="bi bi-chevron-left"></i></button>
                <h2 className={"StepTitle"}>Etape : {Step + 1}</h2>
                {Step === CraftInfo.length - 1 ?
                    <button className={"StepBtnPlus"} onClick={() => craftEnd()}><i className="bi bi-check"></i></button> :
                    <button className={"StepBtnPlus"} onClick={() => setStep(Step + 1)}><i className="bi bi-chevron-right"></i></button>}
                <button className={"StepBtnAll"} onClick={() => valideAll()}><i className="bi bi-check2-all"></i></button>

            </div>
            {HowToCraftInfo !== null?<HowToCraft infos={HowToCraftInfo} />:""}
        </div>
    )

}

export default CraftInfos;