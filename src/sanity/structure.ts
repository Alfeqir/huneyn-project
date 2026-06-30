import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('book').title('Books'),
      S.documentTypeListItem('videoSeries').title('🎬 Video Broadcasts'),
      S.documentTypeListItem('categorizedNote').title('📝 Study Notes'),
    ])