// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { TabPanel } from '@mui/lab';

// export default function ScrollableTab() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box>
//       <Tabs
//       TabIndicatorProps={{
//         style: {
//           backgroundColor: "#22a19a"
//         }
//       }}
//         value={value}
//         onChange={handleChange}
//         variant="scrollable"
//         scrollButtons
//         allowScrollButtonsMobile
//         aria-label="scrollable force tabs example"
//       >
//         <Tab style={{minWidth:"25%"}} label="Item One" value="1" />
//         <Tab style={{minWidth:"25%"}} label="Item Two" />
//         <Tab style={{minWidth:"25%"}} label="Item Three" />
//         <Tab style={{minWidth:"25%"}} label="Item Four" />
//         <Tab style={{minWidth:"25%"}} label="Item Five" />
//         <Tab style={{minWidth:"25%"}} label="Item Six" />
//         <Tab style={{minWidth:"25%"}} label="Item Seven" />
//       </Tabs>
//       <TabPanel value="1">Item One</TabPanel>
//   <TabPanel value="2">Item Two</TabPanel>
//   <TabPanel value="3">Item Three</TabPanel>
//     </Box>
//   );
// }

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DetailProject from '../project/DetailProject';
import CreateSyllabus from '../syllabus/CreateSyllabus';
import CourseList from '../course/CourseList';
import SyllabusList from '../syllabus/SyllabusList';
import ProjectList from '../project/ProjectList';
import TaskList from './TaskList';
import ListProjectTask from './ListProjectTask';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(data) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs TabIndicatorProps={{style: {background:'#22a19a', color: '#22a19a'}}} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Task Before Project" {...a11yProps(0)} />
          <Tab label="Task After Project" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
<TaskList/>
      </TabPanel>
      <TabPanel value={value} index={1}>
<ListProjectTask/>
      </TabPanel>
    </Box>
  );
}