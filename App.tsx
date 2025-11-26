<IslamicPatternCanvas />


{ loading && <Preloader onComplete={() => setLoading(false)} /> }

{
  !loading && (
    <>
      <AudioController isPlaying={true} />
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  )
}
    </div >
  );
}

export default App;