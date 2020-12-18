/**
 * @description require.context取到的路由转为正式路由配置
 * @param routeFiles require.context
 */
export const configRoutesToRoutes = (routeFiles: any) => {
  const configRoutes = routeFiles.keys().map((key: string) => routeFiles(key).default);

  configRoutes.sort((compared: any, current: any) => {
    const [{
      meta: {
        position: comparedPosition
      }
    }] = compared;
    const [{
      meta: {
        position: currentPosition
      }
    }] = current;

    if (comparedPosition && currentPosition) {
      return comparedPosition - currentPosition;
    }

    return false;
  });
  return configRoutes || [];
};

export const generateAUDRoute = () => {};
