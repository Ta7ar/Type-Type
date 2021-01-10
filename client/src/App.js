import React, { useEffect, useState } from "react";
import { Navbar, NavItem, NavLink, NavbarBrand, Nav } from "reactstrap";
import Input from "./components/Input";
import Timer from "./components/Timer";
import Stats from "./components/Stats";
import Chart from "./components/Chart";
import { getData, postData } from "./requests";
function App() {
  const [time, setTime] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [stats, setStats] = useState([]);
  const [modalIsOpen, modalToggle] = useState(false);
  const [data, setData] = useState([]);
  const startCountdown = async () => {
    for (let i = 59; i >= 0; i--) {
      await new Promise((r) => setTimeout(r, 1000));
      setTime(i);
    }
    setStartTimer(false);
  };

  useEffect(() => {
    if (time === 0) {
      //display modal with stats when time runs out
      modalToggle(true);

      //on closing it, reset time
      setTime(60);
    }
  }, [time]);

  useEffect(() => {
    //retrieve data
    getData(setData);
  }, []);

  useEffect(() => {
    //stats only updated at end of a session, send data to backend
    if (stats !== []) {
      const wpm = stats[0];
      postData(setData, wpm);
    }
  }, [stats]);

  return (
    <React.Fragment>
      <Navbar light color="light">
        <NavbarBrand>Type Type</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="https://github.com/Ta7ar/Typing-Stats">
              Github
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <p
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          color: "grey",
          marginTop: "10px",
        }}
      >
        Typing speed test
      </p>
      <h2 style={{ textAlign: "center" }}>Test your typing skills ⚡</h2>
      <Timer>{time}</Timer>
      <Input
        signalStart={() => {
          if (!startTimer) {
            setStartTimer(true);
            startCountdown();
          }
        }}
        time={time}
        setStats={setStats}
      />
      <Stats
        isOpen={modalIsOpen}
        toggle={async () => {
          modalToggle(false);
        }}
        stats={stats}
      />
      <Chart data={data} />
    </React.Fragment>
  );
}

export default App;
