import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }} >
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant='determinate'
            {...props}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant='body2'>{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
  

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired
};

export default function ProgressBar({ checklist }) {
  const [progress, setProgress] = React.useState(0);

  const checkedArray = checklist.checkItems.map((checkItem) => checkItem.state);
  const checkedCount = checkedArray.filter(
    (state) => state === 'complete'
  ).length;

  React.useEffect(() => {
    setProgress((checkedCount / checkedArray.length) * 100);
  }, [checkedCount, checkedArray.length]);


  return <LinearProgressWithLabel value={progress} color={progress!==100?'info':'success'}/>;
}
