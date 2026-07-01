import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Archive')
    .items([
      // 📚 Books Section
      S.documentTypeListItem('book').title('📚 Books'),
      
      // 🎬 Videos Section
      S.documentTypeListItem('videoSeries').title('🎬 Video Broadcasts'),
      
      S.divider(), // ------------------------------------

      // 🎓 HUNEYN ACADEMY PLATFORM SECTIONS
      S.documentTypeListItem('courseTrack').title('🎓 Academy Courses'),
      S.documentTypeListItem('lesson').title('📖 Academy Lessons'),

      S.divider(), // ------------------------------------

      // 📝 Organized Notes Section
      S.listItem()
        .title('📝 Study Notes (By Profile)')
        .child(
          S.list()
            .title('Select Target Audience Group')
            .items([
              S.listItem()
                .title('🎓 Campus Students')
                .child(
                  S.documentList()
                    .title('Campus Student Notes')
                    .filter('_type == "categorizedNote" && category == "campus"')
                ),
              S.listItem()
                .title('📱 Media Users')
                .child(
                  S.documentList()
                    .title('Media User Notes')
                    .filter('_type == "categorizedNote" && category == "media"')
                ),
              S.listItem()
                .title('🏡 Parents')
                .child(
                  S.documentList()
                    .title('Parent Notes')
                    .filter('_type == "categorizedNote" && category == "parents"')
                ),
              S.listItem()
                .title('📚 Students of Ilm')
                .child(
                  S.documentList()
                    .title('Students of Ilm Notes')
                    .filter('_type == "categorizedNote" && category == "ilm"')
                ),
              S.listItem()
                .title('✨ Women')
                .child(
                  S.documentList()
                    .title('Women Profile Notes')
                    .filter('_type == "categorizedNote" && category == "women"')
                ),
              S.listItem()
                .title('💻 Tech Profiles')
                .child(
                  S.documentList()
                    .title('Tech Notes')
                    .filter('_type == "categorizedNote" && category == "tech"')
                ),
              S.divider(),
              // Fallback to view ALL notes together if needed
              S.listItem()
                .title('🗂️ View All Notes (Unfiltered)')
                .child(
                  S.documentList()
                    .title('All Historical Notes')
                    .filter('_type == "categorizedNote"')
                ),
            ])
        ),
    ])