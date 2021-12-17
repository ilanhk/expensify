import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



Enzyme.configure({ 
    adapter: new Adapter() 
});

//Enzyme is a way better version of 'react-test-renderer' because it has more tools for testing react-test-renderer has very few tools.
// Enzyme documentation: https://enzymejs.github.io/enzyme/