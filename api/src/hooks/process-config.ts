// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data } = context;
    const { config } = data;

    // Throw an error if there isn't any config
    if (!config) throw new Error('Config is required');

    // The authenticated user
    const user = context.params.user;

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      config,
      // Set the user id
      userId: user._id,
      // Add the current date
      createdAt: new Date().getTime(),
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
