import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DescriptionIcon from '@mui/icons-material/Description';
import MovieIcon from '@mui/icons-material/Movie';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

export const AdminAbility = [
  {
    title: "Add cinema / halls",
    icon: <EnhancedEncryptionIcon />,
    subItems: [
      { title: 'Add Cinema', icon: <CameraOutdoorIcon /> },
      { title: "Add cinema's hall", icon: <MeetingRoomIcon /> },
      { title: "Hall Reservation", icon: <AirplaneTicketIcon /> }
    ]
  },
  { title: "Add genre", icon: <DescriptionIcon /> },
  { title: "Add movie", icon: <MovieIcon /> },
  { title: "Register new User", icon: <AssignmentIndIcon /> },
]