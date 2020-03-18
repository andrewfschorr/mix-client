import React from 'react';

import { AppContextInterface } from 'models/types';

const AppContext = React.createContext<Partial<AppContextInterface>>({});
export default AppContext;
