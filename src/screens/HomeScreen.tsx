import { ReactComponent as Daily } from '../assets/images/Ubuntu/Ok.svg'
import { ReactComponent as Cards }  from '../assets/images/Ubuntu/Cards.svg'
import { ReactComponent as Archive }  from '../assets/images/Ubuntu/Archive.svg'
import { useNavigate } from 'react-router';
import { Button } from '../components';

function HomeScreen() {
  return (<div className='Home'>
    <Button path={"/daily"}>
        <Daily className='Button'/> Daily
    </Button>
    <Button path={"/all"}>
      <Cards className='Button'/> Cards
    </Button>
    <Button path={"/archive"}>
      <Archive className='Button' /> Archive
    </Button>
</div>
  );
}

export default HomeScreen;
