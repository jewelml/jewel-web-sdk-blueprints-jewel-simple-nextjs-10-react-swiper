import Head from 'next/head'
import dynamic from 'next/dynamic'

const ProductCarousel = dynamic(() => import('../components/ProductCarousel'), {
  ssr: false
})
import SearchControls from '../components/SearchControls'

export default function Home({ modelResults, error, itemId, models }) {
  const getModelName = (modelId) => {
    const modelNames = {
      'L_prod': 'You May Like',
      'B_prod': 'Similar Items', 
      'F_prod': 'Frequently Bought Together',
      'T_prod': 'Top Sellers'
    }
    return modelNames[modelId] || modelId
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <Head>
        <title>Jewel ML - Basic usage example</title>
        <meta name="description" content="Jewel ML - Basic usage example" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>Jewel ML - Basic usage example</h1>
        
        <SearchControls />
        
        {error ? (
          <div style={{ color: 'red', padding: '15px', border: '1px solid red', borderRadius: '4px', marginBottom: '20px' }}>
            <h3>Error fetching data:</h3>
            <p>{error}</p>
          </div>
        ) : modelResults && modelResults.length > 0 ? (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2>Recommendations</h2>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {itemId && <span>Item ID: <strong>{itemId}</strong></span>}
                {models && <span> • Models: <strong>{models.join(', ')}</strong></span>}
              </p>
            </div>
            
            {modelResults.map((result, index) => (
              <div key={result.model} style={{ marginBottom: '40px' }}>
                {result.error ? (
                  <div style={{ color: 'red', padding: '15px', border: '1px solid red', borderRadius: '4px', marginBottom: '20px' }}>
                    <h3>Error for {result.model} ({getModelName(result.model)}):</h3>
                    <p>{result.error}</p>
                  </div>
                ) : result.data && Array.isArray(result.data) && result.data.length > 0 ? (
                  <div>
                    <h3 style={{ marginBottom: '15px' }}>
                      {result.model} - {getModelName(result.model)}
                      <span style={{ color: '#666', fontSize: '14px', fontWeight: 'normal', marginLeft: '10px' }}>
                        ({result.data.length} productos)
                      </span>
                    </h3>
                    <ProductCarousel products={result.data} />
                    
                    <div style={{ marginTop: '20px' }}>
                      <details>
                        <summary style={{ cursor: 'pointer', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                          View Raw API Response - {result.model}
                        </summary>
                        <pre style={{ 
                          background: '#f5f5f5', 
                          padding: '15px', 
                          borderRadius: '4px', 
                          overflow: 'auto',
                          maxHeight: '400px',
                          fontSize: '12px',
                          marginTop: '10px'
                        }}>
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', marginBottom: '20px' }}>
                    <h3>{result.model} - {getModelName(result.model)}</h3>
                    <p style={{ color: '#666' }}>No products found for this model</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#666'
          }}>
            <h3>No products found</h3>
            <p>Enter an item ID above to get recommendations</p>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const itemId = query.item_id || '1177646331_multicolor'
  const modelParam = query.model || 'B_prod'
  const models = modelParam.split(',').map(m => m.trim())
  
  // If no item_id is provided in query, return empty state
  if (!query.item_id) {
    return {
      props: {
        modelResults: [],
        error: null,
        itemId: null,
        models: models
      }
    }
  }
  
  try {
    // Make parallel API calls for each model
    const apiCalls = models.map(async (model) => {
      const apiUrl = `https://repersonalize.jewelml.io/c/p/67fd95260740ccc4ec658d03/l?model=${encodeURIComponent(model)}&item_id=${encodeURIComponent(itemId)}&minimum_items=2&number_of_placements=20`
      
      try {
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        return {
          model,
          data,
          error: null
        }
      } catch (error) {
        return {
          model,
          data: null,
          error: error.message
        }
      }
    })
    
    const results = await Promise.all(apiCalls)
    
    return {
      props: {
        modelResults: results,
        error: null,
        itemId,
        models
      }
    }
  } catch (error) {
    return {
      props: {
        modelResults: [],
        error: error.message,
        itemId,
        models
      }
    }
  }
}
