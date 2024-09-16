
function CraftResources(props) {

    const {resources} = props;

    return (
        <div className={"ResourcesContainer"}>
            <h1 className={"ResourcesTitle"}>Resources</h1>
            <div className={"ResourcesList"}>
                {resources.map(resource => {
                    return <h1 key={resource.id} className={"ResourceInfo " + (resource.craft===resource.nb?"ResourceInfoValide ":"") + (resource.final?"ResourceFinal ":"") }>{resource.name} : {resource.craft}/{resource.nb}</h1>
                })}
            </div>

        </div>
    )

}

export default CraftResources;