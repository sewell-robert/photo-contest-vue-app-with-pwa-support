<template>
    <div>
        <h2>Welcome to the Contest!</h2>
        <h4>The rules are listed here.</h4>
        <ol>
          <li>The contest officially begins December 6th and will end the final week of December.</li>
          <li>Every Sunday will be the start of a new weekly contest.</li>
          <li>Upload only your very best photos from this holiday season.</li>
          <li>Staged photos of people or individuals are not permitted.</li>
          <li>You get a specific number of votes each day. Votes are not carried over.<br/>
              Sun - 1 vote<br />
              Mon - 1 vote<br />
              Tue - 2 votes<br />
              Wed - 2 votes<br />
              Thu - 3 votes<br />
              Fri - 3 votes<br />
              Sat - 5 votes</li>
          <li>The participant with the photo with the most votes each week will win a prize. Winners will be notified on Sunday mornings.</li>
        </ol>
    </div>
</template>

<script>
export default {
  name: 'PolicyPage'
}
</script>

<style scoped>
h2 {
  color: gray;
  font-family: 'Calistoga', cursive;
}
h4 {
  color: gray;
  font-family: 'Calistoga', cursive;
  padding-bottom: 15px;
}
li {
  color: gray;
  font-family: 'Calistoga', cursive;
  padding-bottom: 15px;
}
</style>
