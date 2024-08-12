const MyButton = (props) => {

    return (
        <button onClick={() => props.buttonClick()} type="button" className="btn btn-primary">
            Button
        </button>
    );
};

export default MyButton
