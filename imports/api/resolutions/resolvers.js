import Resolutions from './resolutions';

export default {
  Query: {
    resolutions(obj, args, { userId }) {
      return Resolutions.find({
        userId,
      }).fetch();
    },
  },
  Mutation: {
    createResolution(obj, { name }, { userId }) {
      const resolutionId = Resolutions.insert({
        name,
        userId,
      });
      return Resolutions.findOne(resolutionId);
    },
    deleteResolution(obj, { _id }, context) {
      const resolution = Resolutions.findOne(_id);
      if (resolution !== null) {
        Resolutions.remove({ _id });
      }
      return resolution;
    },
  },
};
