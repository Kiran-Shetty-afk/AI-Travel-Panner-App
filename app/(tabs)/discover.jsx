import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './../../context/ThemeContext';

export default function Discover() {
  const { isDarkMode } = useTheme();
  const dynamicStyles = getDynamicStyles(isDarkMode);
  const [budgetFilter, setBudgetFilter] = useState('All');

  const filterByBudget = (budget) => {
    if (budgetFilter === 'All') return true;
    return destinationBudgets[budget].includes(budget);
  };

  const destinationBudgets = {
    Cheap: ['₹10,000 - ₹20,000', '₹15,000 - ₹30,000', '$1,000 - $2,500'],
    Medium: ['₹25,000 - ₹50,000', '$1,500 - $3,000', '$1,500 - $3,500'],
    Luxury: ['$2,000 - $4,000', '$2,000 - $4,500', '₹50,000+'],
  };

  const domesticDestinations = [
    { name: 'Goa', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg', description: 'Famous for vibrant beaches and lively nightlife, offering a unique blend of Indian and Portuguese cultures.', bestTimeToVisit: 'Novemmber to March', approxCost: '₹25,000 - ₹50,000' },
    { name: 'Agra', image: 'https://foodandtravel.com/imager/hours/219609/Ministry-of-Tourism-Govt-of-India-595161_Taj-Mahal-Uttar-Pradesh-Aerial_821631bb23140209ea99c8f810f75634.jpg', description: 'Home to the iconic Taj Mahal, a historical and cultural landmark representing eternal love and Mughal architecture.Home to the iconic Taj Mahal, a historical and cultural landmark.', bestTimeToVisit: 'October to March', approxCost: '₹10,000 - ₹20,000' },
    { name: 'Manali', image: 'https://www.naturetravelagency.com/uploads/1703234831best%20time%20to%20visit%20Manali%20for%20snowfall.jpg', description: 'A picturesque Himalayan hill station ideal for snow sports, trekking, and breathtaking mountain views.', bestTimeToVisit: 'December to Febuary', approxCost: '₹15,000 - ₹30,000' },
    { name: 'Jaipur', image: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/2f/dc/c3/hawa-mahal-has-been-designed.jpg', description: 'The "Pink City" with majestic forts, opulent palaces, vibrant bazaars, and rich Rajput heritage.', bestTimeToVisit: 'October to March', approxCost: '₹10,000 - ₹20,000' },
    { name: 'Kerala', image: 'https://t4.ftcdn.net/jpg/00/93/72/15/360_F_93721520_PRHW9e77w1cPVReB0GZknG8TaEZb3dKI.jpg', description: 'Known for serene backwaters, pristine beaches, unique houseboat experiences, and lush greenery.', bestTimeToVisit: 'September to March', approxCost: '₹20,000 - ₹35,000' },
    { name: 'Rishikesh', image: 'https://rajajijunglesafari.com/wp-content/uploads/lakshman-jhula-3.jpg', description: 'The "Yoga Capital," offering spiritual retreats and thrilling river rafting along the sacred Ganges.', bestTimeToVisit: 'Febuary to June', approxCost: '₹10,000 - ₹20,000' },
    { name: 'Leh-Ladakh', image: 'https://media.istockphoto.com/id/1218830644/photo/beautiful-lake.jpg?s=612x612&w=0&k=20&c=r5or5KmtrZE5P93cDPG2FzxWQxhZA0qeTInoXJ7qXxA=', description: ' Stunning high-altitude desert mountains with serene monasteries and unique Tibetan Buddhist culture.', bestTimeToVisit: 'May to September', approxCost: '₹30,000 - ₹50,000' },
    { name: 'Andaman Islands', image: 'https://media.istockphoto.com/id/1040379102/photo/scenic-sea-beach-at-havelock-islands-andaman-india-at-sunset.jpg?s=612x612&w=0&k=20&c=SLg_actds7IqPJsTm7gadaDlJjctll_8tb9fkjhDu5Y=', description: 'Pristine beaches with crystal-clear waters, vibrant coral reefs, and lush tropical forests.', bestTimeToVisit: 'October to May', approxCost: '₹35,000 - ₹50,000' },
  ];

  const internationalDestinations = [
    { name: 'Paris, France', image: 'https://www.pandotrip.com/wp-content/uploads/2013/08/1D110-Bertrand-Monney.jpg', description: 'The romantic "City of Love," famous for iconic landmarks, world-class museums, and charming ambiance.', bestTimeToVisit: 'April to June, September to November', approxCost: '$1,500 - $3,000' },
    { name: 'Bali, Indonesia', image: 'https://www.himalayanspace.com/wp-content/uploads/2023/04/bali-.jpg', description: 'A tropical paradise renowned for beautiful beaches, lush rice paddies, and spiritual atmosphere.', bestTimeToVisit: 'Apr to Oct', approxCost: '$1,000 - $2,500' },
    { name: 'Tokyo, Japan', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/7c/eb/cb/photo0jpg.jpg?w=800&h=500&s=1', description: 'A captivating blend of ultramodern cityscapes and ancient traditions, offering a unique cultural experience.', bestTimeToVisit: 'Mar to May, September to November', approxCost: '$2,000 - $4,000' },
    { name: 'Rome, Italy', image: 'https://inlifehousing.com/wp-content/uploads/2023/06/Roma.jpg', description: 'An open-air museum brimming with ancient monuments, rich history, and vibrant Italian culture', bestTimeToVisit: 'April to June, September to October', approxCost: '$1,500 - $3,500' },
    { name: 'Dubai, UAE', image: 'https://media.istockphoto.com/id/184837092/photo/stunning-dubai.jpg?s=612x612&w=0&k=20&c=yfJzKavYiM1oDPUsB1swGFVsYWyOmuVp2KjPVASd08c=', description: 'Known for modern luxury, innovative architecture, desert adventures, and a multicultural environment.', bestTimeToVisit: 'November to Mar', approxCost: '$1,500 - $3,000' },
    { name: 'Sydney, Australia', image: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?...', description: 'Features the iconic Opera House, beautiful beaches, and a relaxed outdoor lifestyle.', bestTimeToVisit: 'Sep to November, Mar to May', approxCost: '$2,000 - $4,500' },
    { name: 'Cape Town, South Africa', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/2c/6a/c0/cape-point-nature-reserve.jpg?w=1200&h=-1&s=1', description: ' Offers stunning natural beauty, diverse landscapes, rich history, and unique wildlife encounters.', bestTimeToVisit: 'November to Mar', approxCost: '$1,500 - $3,000' },
    { name: 'New York, USA', image: 'https://media.istockphoto.com/id/1339120709/photo/statue-of-liberty-n-new-york.jpg?s=612x612&w=0&k=20&c=e7bOhuBIGdNg0YryqdUjSFNge4udxWn0zLiW84GmT7w=', description: 'A dynamic global center for culture, finance, and iconic landmarks like Times Square.', bestTimeToVisit: 'April to June, September to November', approxCost: '$2,000 - $4,000' },
    { name: 'Santorini, Greece', image: 'https://media.istockphoto.com/id/510967662/photo/santorini-sunset-at-dawn-village-of-oia-greece.jpg?s=612x612&w=0&k=20&c=O05ZFOTQmVs7m34iL7-WTlPIW7XcWH55V9WCm03i1JI=', description: ' Famous for its whitewashed villages, breathtaking sunset views over the caldera, and romantic charm.', bestTimeToVisit: 'Apr to Oct', approxCost: '$1,500 - $3,000' },
    { name: 'Bangkok, Thailand', image: 'https://res.cloudinary.com/kmadmin/image/upload/v1736427123/kiomoi/wat_arun_6252.jpg', description: 'A vibrant city with ornate temples, bustling street markets, and a rich cultural heritage.', bestTimeToVisit: 'November to Mar', approxCost: '$1,000 - $2,500' },
  ];

  const renderDestinations = (list) =>
    list
      .filter((destination) =>
        budgetFilter === 'All' ||
        (budgetFilter === 'Cheap' && destinationBudgets.Cheap.includes(destination.approxCost)) ||
        (budgetFilter === 'Medium' && destinationBudgets.Medium.includes(destination.approxCost)) ||
        (budgetFilter === 'Luxury' && destinationBudgets.Luxury.includes(destination.approxCost))
      )
      .map((destination, index) => (
        <View key={index} style={dynamicStyles.destinationContainer}>
          <Image source={{ uri: destination.image }} style={styles.image} />
          <Text style={dynamicStyles.destinationName}>{destination.name}</Text>
          <Text style={dynamicStyles.description}>{destination.description}</Text>
          <Text style={dynamicStyles.details}>Best Time: {destination.bestTimeToVisit}</Text>
          <Text style={dynamicStyles.details}>Approx. Cost: {destination.approxCost}</Text>
        </View>
      ));

  return (
    <ScrollView style={dynamicStyles.scrollContainer}>
      <Text style={dynamicStyles.heading}>Discover Amazing Destinations</Text>

      <View style={styles.filterContainer}>
        {['All', 'Cheap', 'Medium', 'Luxury'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setBudgetFilter(type)}
            style={[styles.filterButton, budgetFilter === type && styles.activeButton]}>
            <Text style={[styles.filterText, budgetFilter === type && styles.activeText]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={dynamicStyles.subheading}>Domestic Trips</Text>
      {renderDestinations(domesticDestinations)}

      <Text style={dynamicStyles.subheading}>International Trips</Text>
      {renderDestinations(internationalDestinations)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  destinationContainer: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  filterText: {
    color: '#333',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  activeText: {
    color: '#fff',
  },
});

const getDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    scrollContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f4f4f4',
      padding: 10,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: isDarkMode ? '#fff' : '#000',
    },
    subheading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: isDarkMode ? '#fff' : '#000',
    },
    destinationContainer: {
      backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
      marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
    },
    destinationName: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 10,
      color: isDarkMode ? '#fff' : '#000',
    },
    description: {
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#666',
      marginVertical: 5,
    },
    details: {
      fontSize: 14,
      color: isDarkMode ? '#aaa' : '#888',
    },
  });

