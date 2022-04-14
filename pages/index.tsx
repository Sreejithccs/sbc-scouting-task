import BasicModal from "@/components/Modal";
import { Alert, AlertColor, AlertTitle } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import StartupTable from "../components/StartupTable";
import { Startup } from "../types/startup";
import { AlertMessage } from "../types/alert";
import CircularProgress from "@mui/material/CircularProgress";
import { ResponseMessage } from "types/response";
import { APP_CONSTANTS } from "common/constants";
import { STARTUP_API } from "common/apiConstants";

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
    const response = await fetch(STARTUP_API.get);
    setIsLoading(false);
    if (response.status !== 200) return;
    const responseMessage = (await response.json()) as ResponseMessage;
    const data = responseMessage.data as Startup[];
    setStartups(data);
  };

  const setAlert = useCallback((alertObj: AlertMessage) => {
    setAlertObj(alertObj);
    setTimeout(() => {
      setAlertObj(null);
    }, 3000);
  }, []);

  useEffect(() => {
    fetchStartups();
  }, []);

  //handler to update startup
  const submitHandler = async (value: Startup) => {
    //api call to update json data:
    try {
      setIsLoading(true);
      const response = await fetch(STARTUP_API.put + `${value.id}`, {
        body: JSON.stringify(value),
        method: "PUT",
      });
      setIsLoading(false);
      const responseMessage = (await response.json()) as ResponseMessage;
      if (response.status == 200) {
        //resetting modal
        setModalData({});
        setShowModal(false);
        //refresh startup list
        fetchStartups();
        setAlert({
          severity: "success",
          title: APP_CONSTANTS.SERVER_SUC_MSG_TITLE,
          message: responseMessage.message,
        });
      } else {
        setAlert({
          title: APP_CONSTANTS.SERVER_ERR_MSG_TITLE,
          message:
            responseMessage.message || APP_CONSTANTS.SERVER_FAILED_UPDATE_ERR,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setAlert({
        title: APP_CONSTANTS.SERVER_ERR_MSG_TITLE,
        message: APP_CONSTANTS.SERVER_UNKNOWN_ERR,
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
