import BasicModal from "@/components/Modal";
import { Alert, AlertColor, AlertTitle } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import { NextPage } from "next";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import StartupTable from "../components/StartupTable";
import { Startup } from "../types/startup";
import { AlertMessage } from "../types/alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Home: NextPage = () => {
  const [modalData, setModalData] = useState({});
  const [alertObj, setAlertObj] = useState<AlertMessage | null>();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //handle row doucble click, set modal data
  const handleOnRowClick = useCallback((rowData: Startup) => {
    setShowModal(true);
    setModalData(rowData);
  }, []);
  //close modal- closing and reset data
  const handleOnModalClose = () => {
    setShowModal(false);
    setModalData({});
  };

  const [startups, setStartups] = useState<Startup[]>([]);
  //fetch all startup from api
  const fetchStartups = async () => {
    setIsLoading(true);
    const response = await fetch("/api/startup");
    setIsLoading(false);
    if (response.status !== 200) return;
    const data = await response.json();
    setStartups(data);
  };

  const setAlert = useCallback((alertObj: AlertMessage) => {
    setModalData({});
    fetchStartups();
    setAlertObj(alertObj);
    setTimeout(() => {
      setAlertObj(null);
    }, 3000);
  }, []);

  useEffect(() => {
    fetchStartups();
  }, []);

  //handler to update startup
  const submitHandler = async (value: any) => {
    //api call to update json data:
    try {
      setIsLoading(true);
      const response: any = await fetch(`/api/startup/${value.id}`, {
        body: JSON.stringify(value),
        method: "PUT",
      });
      setIsLoading(false);
      const body = await response.json();
      if (response.status == 200) {
        //refresh startup list
        setShowModal(false);
        setAlert({
          severity: "success",
          title: "Success",
          message: body.message || "Startup updated",
        });
      } else {
        setAlert({
          title: "Server Error",
          message: body.message || "Failed to update",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setAlert({
        title: "Server Error",
        message: "Failed to update with unknown error",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 font-gray-700 font-medium text-2xl">Startups</div>
      <StartupTable handleOnRowClick={handleOnRowClick} startups={startups} />
      {showModal && (
        <BasicModal
          open={showModal}
          modalData={modalData}
          onModalClose={handleOnModalClose}
          onSubmit={submitHandler}
        />
      )}
      {alertObj && (
        <Alert
          className="alert-block"
          severity={alertObj?.severity || "error"}
          onClose={() => setAlertObj(null)}
        >
          <AlertTitle>{alertObj?.title || "Unknown Error"}</AlertTitle>
          {alertObj?.message || "Something went wrong!"}
        </Alert>
      )}
      {isLoading && (
        <div className="loader-overlay">
          <CircularProgress size={80} color="primary" thickness={7} />
        </div>
      )}
    </div>
  );
};

export default Home;
