import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

export default function Stats(props) {
  const { isOpen, toggle, stats } = props;
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className="stat-board">
          <div>
            <div className="stat">
              <h4>{stats[0]}</h4>
            </div>
            <p>words/min</p>
          </div>
          <div>
            <div className="stat">
              <h4>{stats[1]}</h4>
            </div>
            <p>characters/min</p>
          </div>
          <div>
            <div className="stat">
              <h4>{stats[2]}</h4>
            </div>
            <p>% accuracy</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle} color="warning">
            Try Again!
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
