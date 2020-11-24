<template>
    <div>
        <h4>Welcome to the Contest!<br />The rules are listed here.</h4><br />
        <ol>
          <li>The contest officially starts on Thanksgiving Day, November 26th and will end during the final week of December.</li>
          <li>Every Sunday will begin a new weekly contest. This means you will have a chance to win every week for the next 6 weeks.</li>
          <li>You may upload as many photos as you like, but please make sure you only choose your very best.</li>
          <li>Please do not upload photos of people or individuals. As long as the photo is not staged, people may be included in the background or environment.</li>
          <li>Each participant gets one vote per day. That is 7 votes per week. Votes are not carried over, so make sure you stop by at least once per day to cast your vote or you will lose it.</li>
          <li>Lastly, the person whose photo receives the most votes each week will win a prize and will be displayed on the Winners page.</li>
        </ol>
        <h4 class="thanks">Thanks for playing and have fun!</h4>
    </div>
</template>

<script>
export default {
  name: 'PolicyPage'
}
</script>

<style scoped>
h4 {
  color: #043404;
  font-family: 'Permanent Marker', cursive;
}
li {
  color: #043404;
  font-family: 'Permanent Marker', cursive;
  padding-bottom: 10px;
}
.thanks {
  color: #A81016;
}
</style>
