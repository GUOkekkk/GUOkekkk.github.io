import geopandas as gpd
import matplotlib.pyplot as plt

# Load the countries geometry
world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))

# List the countries you have visited
visited_countries = ['France', 'Iceland', 'England']

# Update the 'visited' column based on your list
world['visited'] = world['name'].apply(lambda x: 1 if x in visited_countries else 0)

# Now we can plot the world, coloring visited countries differently
fig, ax = plt.subplots(1, 1)

world[world['visited'] == 0].plot(ax=ax, color='white', edgecolor='black')
world[world['visited'] == 1].plot(ax=ax, color='green', edgecolor='black')

plt.show()
