import Home from './pages/home';
import DragDemo from './pages/dnd';

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
    title: 'testttHome',
    content: DragDemo,
    iconType: 'upload'
  },
];