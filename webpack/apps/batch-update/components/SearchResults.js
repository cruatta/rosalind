import React from 'react'
import missingImage from 'file-loader!./missing_image.png'
import ArtworkPreviewModal from './ArtworkPreviewModal'
import Spinner from './Spinner'

function SearchResults (props) {
  const { className, artworks, isLoading, previewedArtwork, onPreviewArtwork, onPreviewPrevious, onPreviewNext } = props
  return (
    <div className={className}>
      {isLoading && <Spinner />}
      {
        previewedArtwork && <ArtworkPreviewModal
          artwork={previewedArtwork}
          onPreviewArtwork={onPreviewArtwork}
          onPreviewPrevious={onPreviewPrevious}
          onPreviewNext={onPreviewNext}
          />
      }
      {
        artworks.map((artwork) =>
          <ArtworkResult key={artwork.id}
            artwork={artwork}
            onPreviewArtwork={onPreviewArtwork}
            />
        )
      }
    </div>
  )
}

SearchResults.propTypes = {
  artworks: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool,
  previewedArtwork: React.PropTypes.object,
  onPreviewArtwork: React.PropTypes.func,
  onPreviewPrevious: React.PropTypes.func,
  onPreviewNext: React.PropTypes.func
}

const ArtworkResult = ({artwork, onPreviewArtwork}) => {
  const { name, image_url: imageUrl } = artwork
  return (
    <div className='result' onClick={() => { onPreviewArtwork(artwork) }}>
      <img src={imageUrl || missingImage} alt={name} />
      <figcaption>{name}</figcaption>
    </div>
  )
}

/* default styled component */

import styled from 'styled-components'

const StyledSearchResults = styled(SearchResults)`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;

  .result {
    min-width: 115px;
    max-width: calc(20% - 1.5em);
    margin: 0.75em;
    flex: 1 1 calc(20% - 1.5em);

    img {
      width: 100%;
    }

    figcaption {
      position: relative;
      font-size: 80%;
      max-height: 3.75em;
      line-height: 1.25em;
      overflow: hidden;
    }
  }
`

export default StyledSearchResults