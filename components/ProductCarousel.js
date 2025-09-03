import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

export default function ProductCarousel({ products }) {
  if (!products || products.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>No products to display</p>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={4}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
      >
        {products.map((product, index) => {
          const features = product.standard_features || {}
          const imageUrl = features.image_url_src || product.image_url
          const salePrice = features.sale_price || features.price
          const originalPrice = features.price
          const currency = features.price_currency || 'MXN'
          const rating = features.rating
          const ratingCount = features.rating_count
          
          return (
            <SwiperSlide key={product._id || index}>
              <div style={{
                padding: '10px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.title || 'Product'}
                      style={{
                        width: '100%',
                        aspectRatio: '3/4',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  
                  <div style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    backgroundColor: '#f5f5f5',
                    display: imageUrl ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '14px'
                  }}>
                    Sin imagen
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '14px',
                    margin: '0 0 6px 0',
                    lineHeight: '1.3',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                    {product.title || 'Producto sin título'}
                  </h3>
                  
                  {features.brand && (
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: '0 0 6px 0',
                      fontWeight: '400'
                    }}>
                      {features.brand}
                    </p>
                  )}
                  
                  <div style={{ marginBottom: '6px' }}>
                    {salePrice && originalPrice && salePrice !== originalPrice ? (
                      <div>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: '#000'
                        }}>
                          ${salePrice.toLocaleString()} {currency}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          textDecoration: 'line-through',
                          color: '#999',
                          marginLeft: '8px'
                        }}>
                          ${originalPrice.toLocaleString()}
                        </span>
                      </div>
                    ) : salePrice ? (
                      <span style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#000'
                      }}>
                        ${salePrice.toLocaleString()} {currency}
                      </span>
                    ) : null}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {rating > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ 
                          color: '#f39c12', 
                          fontSize: '12px',
                          marginRight: '4px'
                        }}>
                          ★ {rating}
                        </span>
                        {ratingCount > 0 && (
                          <span style={{ 
                            fontSize: '11px', 
                            color: '#999' 
                          }}>
                            ({ratingCount})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}