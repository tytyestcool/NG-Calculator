
function HowToCraft(props) {

    // eslint-disable-next-line react/prop-types
    const {infos = {}} = props;

    console.log(infos)

    return (
        <div className={"HowToCraft"}>
            <h1>Comment avoir un {infos.name}</h1>
        </div>
    )

}

export default HowToCraft;