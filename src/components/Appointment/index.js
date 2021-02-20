import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  //SAVING FUNCTION 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    console.log("INTERVIEW", interview);

    transition(SAVING); //shows loading before interview booked
    props
    .bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW) 
    })
    .catch(error => transition(ERROR_SAVE));
  }
//where is the error?

//CANCEL FUNCTION 
  function cancel() {
    console.log("CANCELLLL");
    transition(DELETING); //DONT FORGET TO TRANSITION!!!!!!!!!
    props
      .cancelInterview(props.id)
      .then(() => {
        transition("EMPTY"); //once the promise resolves we will transition to show
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SAVING && <Status message="Saving Interview" />}
      {mode === DELETING && <Status message="Deleting Interview" />}

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onCancel={back}
          onConfirm={cancel}
        />
      )}

      {mode === CREATE && (
        <Form
          name={""}
          interviewers={props.interviewers}
          interviewer={{}}
          onSave={save} //will update with info from database
          onCancel={() => back()}
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => console.log("onEdit")}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Appointment did not save, please try again"
          onClose={back} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Appointment did not cancel, please try again" onClose={back} />
      )}
    </article>
  );
}
