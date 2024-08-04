import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColor } from '../theme/theme'
import * as Icon from 'react-native-feather'
import { Categories, shortVideos } from '../constants'
import ShortVideoCard from '../components/shortVideoCard'
import VideoCard from '../components/VideoCard'
import { fetchTrendingVideos } from '../api/youtube'
export default function Homescreen() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [videos, setVideos] = useState ([])

  useEffect(() => {
    fetchData();
  }, [])
const fetchData= async() =>  {
  try {
    
    const data = await fetchTrendingVideos()
    console.log('video' , data[0])
      setVideos(data)
  } catch (error) {
    console.error(error)
  }
}

  return (
    <View style={{ backgroundColor: themeColor.bgWhite }} className='flex-1 mt-7 pt-3'>
      {/* logo and profile icon  */}
      <SafeAreaView className='justify-between mx-4 flex-row'>
        <View className='flex-row items-center space-x-1'>
          <Image source={require('../assets/youtube.png')}
            className='h-7 w-10'
          />
          <Text className='text-white font-semibold text-xl tracking-tighter'>YouTube</Text>
        </View>
        <View className='flex-row items-center space-x-4'>
          <Icon.Cast stroke='white' strokeWidth={1.2} height='22' />
          <Icon.Bell stroke='white' strokeWidth={1.2} height='22' />
          <Icon.Search stroke='white' strokeWidth={1.2} height='22' />
          <Image source={require('../assets/img.jpeg')}
            className='h-7 w-7 rounded-full'
          />
        </View>
      </SafeAreaView>

      <ScrollView className='flex-1 mt-6' showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View className='py-2 pb-5'>
          <ScrollView className='px-4' horizontal showsHorizontalScrollIndicator={false}>
            {
              Categories.map((category, index) => {
                let isActive = category == activeCategory
                let textClass = isActive ? 'text-black' : 'text-white'
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveCategory(category)}
                    style={{ backgroundColor: isActive ? 'white' : 'rgba(255,255,255, 0.1)' }}
                    className='rounded-md p-1 px-3 mr-2'
                  >
                    <Text className={textClass}>{category}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
            {/* suggested Video */}
            {/* <VideoCard video={videos[3]}/> */}


        {/* Short Videos */}
        <View
          className='mt-2 py-5 space-y-3 border-t-zinc-700 border-b-zinc-700 border-4 border-l-0 border-r-0'
        >
          <View className='mx-4 flex-row items-center space-x-2'>
            <Image source={require('../assets/icons8-youtube-shorts-480.png')}
              className='h-6 w-5' />
            <Text className='text-white font-semibold text-lg tracking-tighter'>Shorts</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
          className='px-4'>
            {
              shortVideos.map((item,index)=> <ShortVideoCard item={item } key={index}/>)
            }
          </ScrollView>
        </View>


        {/* Videos */}
            <ScrollView showsVerticalScrollIndicator={false}>
            {
              videos.map((video,index ) => <VideoCard video={video} key={index} /> )
            }
            </ScrollView>

      </ScrollView>
    </View>
  )
}

