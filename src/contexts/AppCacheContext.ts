import * as React from 'react';
import { AppCache } from '../redux/cache';

const defaultAppCache = new AppCache([]);
export const appCacheContext = React.createContext<AppCache>(defaultAppCache);
