import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CLICK_TASK } from "../../../../actions/createTask";
import Pagination from "../../../footer/Pagination";
import ContentItem from '../ContentItem';

const DoingTaskList = ({ dataDoingTaskList, target, onClickedTask }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(12)
    const [totalTodos] = useState(dataDoingTaskList.length)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const indexOfLastTodos = currentPage * todosPerPage;
    const indexOfFirstTodos = indexOfLastTodos - todosPerPage;
    const currentTodos = dataDoingTaskList.slice(indexOfFirstTodos, indexOfLastTodos)

    return (
        <>
            {currentTodos.map(item => (
                <Link to="edit">
                    <ContentItem
                        key={item.id}
                        title={item.title}
                        creator={item.creator}
                        status={item.status}
                        description={item.description}
                        clicked={() => onClickedTask(item)} />
                </Link>

            )
            )}
            < Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                todosPerPage={todosPerPage}
                totalTodos={totalTodos}
            />
        </>
    )
}

const mapStateToProps = state => {
    return {
        dataDoingTaskList: state.create.arrDoing,
        target: state.create.target
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickedTask: (item) => { dispatch({ type: CLICK_TASK, value: item }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoingTaskList)