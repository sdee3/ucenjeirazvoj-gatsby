const path = require(`path`);
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const subTopicTemplate = path.resolve(`src/templates/subTopic.js`);
  const subTopicEditTemplate = path.resolve(`src/templates/editSubTopic.js`);

  const result = await graphql(`
    query {
      ucenjeirazvoj {
        subtopics {
          name
          intro
          content
          slug
          img_url
          topic {
            id
            name
          }
        }
      }
    }
  `);

  result.data.ucenjeirazvoj.subtopics.forEach((subtopic) => {
    createPage({
      path: `/tema/${subtopic.slug}`,
      component: subTopicTemplate,
      context: {
        slug: subtopic.slug,
      },
    });

    createPage({
      path: `/tema/${subtopic.slug}/edit`,
      component: subTopicEditTemplate,
      context: {
        slug: subtopic.slug,
      },
    });
  });
};
