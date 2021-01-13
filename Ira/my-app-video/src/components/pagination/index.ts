import {connect, ConnectedProps} from "react-redux";
import {IRootState} from "../../redux";
import { fetchMovies} from "../../redux/movies/actions";

import Pagination from "./Pagination";

const mapStateToProps = (state: IRootState) => ({
  totalMovies: state.moviesState.totalMovies,
});

const mapDispatchToProps = {
  fetchMovies
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PaginationConnectProps = ConnectedProps<typeof connector>;

export default connector(Pagination);
