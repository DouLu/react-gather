import Home from './pages/home';
import DragDemo from './pages/dnd';
import Upload from './components/Upload';

export const routerConfig = [
  {
    path: '/home',
    title: 'home',
    content: Home,
    iconType: 'user'
  },
  {
    path: '/test',
    title: 'test',
    content: DragDemo,
    iconType: 'upload'
  },
  {
    path: '/testtt',
    title: 'upload',
    content: Upload,
    iconType: 'upload'
  },
];